const LimitSelector = ({limit, onLimitChange}) => {
    return ( <>
    <div className="controls">
          <label htmlFor="limit">Show:
            <select value={limit} id="limit" onChange={ (e) => onLimitChange((Number(e.target.value)))}>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </label>
        </div>
    </> );
}

export default LimitSelector;