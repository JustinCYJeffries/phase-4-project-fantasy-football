import { useState } from 'react';

const PlayerSearchForm = (props) => {
  const { onSearch } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePositionFilterChange = (event) => {
    setPositionFilter(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm, positionFilter);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <label>
        Search by name:
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
      </label>
      <label>
        Filter by position:
        <select value={positionFilter} onChange={handlePositionFilterChange}>
          <option value="">All Positions</option>
          <option value="QB">Quarterback</option>
          <option value="RB">Running Back</option>
          <option value="WR">Wide Receiver</option>
          <option value="TE">Tight End</option>
          <option value="K">Kicker</option>
          <option value="DEF">Defense/Special Teams</option>
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default PlayerSearchForm;