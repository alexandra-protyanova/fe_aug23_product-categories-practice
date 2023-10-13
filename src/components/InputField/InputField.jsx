export const InputField = ({ query, setQuery }) => (
  <div className="panel-block">
    <p className="control has-icons-left has-icons-right">
      <input
        onChange={event => setQuery(event.target.value)}
        data-cy="SearchField"
        type="text"
        className="input"
        placeholder="Search"
        value={query}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>
      {query
        && (
          <span className="icon is-right">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => setQuery('')}
              data-cy="ClearButton"
              type="button"
              className="delete"
            />
          </span>
        )}
    </p>
  </div>
);
