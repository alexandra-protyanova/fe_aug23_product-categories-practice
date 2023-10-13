export const TableHead = () => (
  <thead>
    <tr>
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          ID

          <a href="#/">
            <span className="icon">
              <i data-cy="SortIcon" className="fas fa-sort" />
            </span>
          </a>
        </span>
      </th>

      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Product

          <a href="#/">
            <span className="icon">
              <i data-cy="SortIcon" className="fas fa-sort-down" />
            </span>
          </a>
        </span>
      </th>

      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Category

          <a href="#/">
            <span className="icon">
              <i data-cy="SortIcon" className="fas fa-sort-up" />
            </span>
          </a>
        </span>
      </th>

      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          User

          <a href="#/">
            <span className="icon">
              <i data-cy="SortIcon" className="fas fa-sort" />
            </span>
          </a>
        </span>
      </th>
    </tr>
  </thead>
);
