import cn from 'classnames';

export const Users = ({ users, currentUser, setCurrentUser }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      onClick={() => setCurrentUser('')}
      data-cy="FilterAllUsers"
      href="#/"
      className={
        cn(
          { 'is-active': currentUser === '' },
        )
      }
    >
      All
    </a>

    {users.map(user => (
      <a
        key={user.id}
        onClick={() => setCurrentUser(user.name)}
        data-cy="FilterUser"
        href="#/"
        className={
          cn(
            { 'is-active': user.name === currentUser },
          )
        }
      >
        {user.name}
      </a>
    ))}
  </p>
);
