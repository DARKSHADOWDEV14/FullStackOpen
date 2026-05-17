const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <>
      filter shown with:
      <input
        value={filterName}
        onChange={handleFilterChange}
      />
    </>
  )
}

export default Filter