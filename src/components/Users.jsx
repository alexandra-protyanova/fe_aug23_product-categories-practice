import usersFromServer from '../api/users';

export const Users = (
  {
    isSelected,
    currentButton,
    setCurrentButton,
    setVisibleProducts,
    products,
    filterByUser,
  },
) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterAllUsers"
      href="#/"
      className={isSelected(currentButton, 'all') ? 'is-active' : ''}
      onClick={() => {
        setCurrentButton('all');
        setVisibleProducts([...products]);
      }}
    >
      All
    </a>

    {usersFromServer.map(user => (
      <a
        data-cy="FilterUser"
        href="#/"
        key={user.id}
        className={
          isSelected(currentButton, user.id)
            ? 'is-active'
            : ''
        }
        onClick={() => {
          setCurrentButton(user.id);
          setVisibleProducts(filterByUser(user.id));
        }}
      >
        {user.name}
      </a>
    ))
    }

  </p>
);
