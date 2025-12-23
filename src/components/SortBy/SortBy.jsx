const SortBy = ({sortBy, onSortChange}) => {
    return ( <>
    <div className="controls">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="market_cap_desc">📈market cap (High to Low)</option>
            <option value="market_cap_asc">📈market cap (Low to High)</option>
            <option value="price_desc">💲Price (High to Low)</option>
            <option value="price_asc">💲Price (Low to High)</option>
            <option value="change_desc">🕛24h Change (High to Low)</option>
            <option value="change_asc">🕛24h Change (Low to High)</option>
        </select>
    </div>
    </> );
}
 
export default SortBy;

{/* pata nahi kya ho raha h, sab kuchh gira dia. 2 baar paani gira dia batao. Pehli bar gira to socha achha hua 
farsh par gira ki mera laptop bach gaya. Dusri bar poori bottle sidha laptop par hi udel di bc!! -_-
 */}