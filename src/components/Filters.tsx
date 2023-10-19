import React from 'react';
import cn from 'classnames';
import { categories } from '../api/categories';
import { users } from '../api/users';

type Props = {
  selectedUserId: number;
  setSelectedUserId: (value: number) => void;
  query: string;
  setQuery: (value: string) => void;
  selectedCategoriesIds: number[];
  setSelectedCategoriesIds: (value: number[]) => void;
};

export const Filters: React.FC<Props> = ({
  selectedUserId,
  setSelectedUserId,
  query,
  setQuery,
  selectedCategoriesIds,
  setSelectedCategoriesIds,
}) => {
  function toggleCategories(categoryId: number) {
    if (selectedCategoriesIds.includes(categoryId)) {
      setSelectedCategoriesIds(selectedCategoriesIds.filter(id => (
        id !== categoryId
      )));
    } else {
      setSelectedCategoriesIds([...selectedCategoriesIds, categoryId]);
    }
  }

  function resetAll() {
    if (selectedUserId) {
      setSelectedUserId(0);
    }

    if (query) {
      setQuery('');
    }

    if (selectedCategoriesIds.length) {
      setSelectedCategoriesIds([]);
    }
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={cn({
            'is-active': !selectedUserId,
          })}
          onClick={() => {
            setSelectedUserId(0);
          }}
        >
          All
        </a>

        {users.map(user => (
          <a
            data-cy="FilterUser"
            href="#/"
            key={user.id}
            className={cn({
              'is-active': user.id === selectedUserId,
            })}
            onClick={() => {
              setSelectedUserId(user.id);
            }}
          >
            {user.name}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            data-cy="SearchField"
            type="text"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {query.length > 0 && (
            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => {
                  setQuery('');
                }}
              />
            </span>
          )}

        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          className={cn('button is-success mr-6', {
            'is-outlined': selectedCategoriesIds.length > 0,
          })}
          onClick={() => {
            setSelectedCategoriesIds([]);
          }}
        >
          All
        </a>

        {categories.map(category => (
          <a
            data-cy="Category"
            className={cn('button mr-2 my-1', {
              'is-info': selectedCategoriesIds.includes(category.id),
            })}
            href="#/"
            key={category.id}
            onClick={() => {
              toggleCategories(category.id);
            }}
          >
            {category.title}
          </a>
        ))}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className={cn('button is-fullwidth is-outlined', {
            'is-link': selectedUserId || query
              || selectedCategoriesIds.length !== 0,
          })}
          onClick={resetAll}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
