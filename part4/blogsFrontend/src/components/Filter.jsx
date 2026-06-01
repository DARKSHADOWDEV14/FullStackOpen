const Filter = ({ filterTitle, handleFilterChange }) => {
  return (
    <>
      <input
        value={filterTitle}
        onChange={handleFilterChange}
      />
    </>
  )
}

export default Filter