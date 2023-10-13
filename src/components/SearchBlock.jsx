/*eslint-disable*/

export const SearchBlock = ({setQuery, deleteBtn}) => {
  return (
    <p className="control has-icons-left has-icons-right">

      <input
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        data-cy="SearchField"
        type="text"
        className="input"
        placeholder="Search"
      />

      {/* {input.value === true ? console.log(true) : console.log(false)} */}


      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>

      <span className="icon is-right">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          onClick={deleteBtn}
          data-cy="ClearButton"
          type="button"
          className="delete"
        />
      </span>
    </p>

  )
}
