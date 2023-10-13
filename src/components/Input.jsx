export const Input = (
  {
    currentInput,
    setCurrentInput,
    setVisibleProducts,
    filterByInput,
  },
) => (
  <div className="panel-block">
    <p className="control has-icons-left has-icons-right">
      <input
        data-cy="SearchField"
        type="text"
        className="input"
        placeholder="Search"
        value={currentInput}
        onChange={(e) => {
          const updatedInput = e.target.value.toLowerCase();

          setCurrentInput(updatedInput);
          setVisibleProducts(filterByInput(updatedInput));
        }
        }
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>

      {currentInput.length > 0 && (
        <span className="icon is-right">
          <button
            data-cy="ClearButton"
            type="button"
            className="delete"
            onClick={() => setCurrentInput('')}
          />
        </span>
      )}

    </p>
  </div>
);
