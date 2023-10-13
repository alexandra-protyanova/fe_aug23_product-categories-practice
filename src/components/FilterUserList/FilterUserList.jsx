import cn from 'classnames';

export const FilterUserList = ({ owners, selectedUser, onSelectedUser }) => (
  owners.map(user => (
    <a
      data-cy={user === 'All' ? 'FilterAllUsers' : 'FilterUser'}
      href="#/"
      className={cn({
        'is-active': selectedUser === user,
      })}
      onClick={() => onSelectedUser(user)}
    >
      {user}
    </a>
  ))
);
