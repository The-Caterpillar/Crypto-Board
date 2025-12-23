const Filter = ({filter, onFilterChange}) => {
    return ( <>
    <div className="filter">
        <input type="text" value={filter} 
                onChange={ (e) => onFilterChange(e.target.value)}
                placeholder="Filter Coins by name or symbol"/>
    </div>
    </> );
}
 
export default Filter;