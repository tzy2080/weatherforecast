import axios from 'axios';

const SearchBar = ({cityName, setCityName, setSearchResult, setSelectSearchResult, setNotFound}) => {
    // Function that handles the search button 
    const Search = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:5000/search/cities/${cityName}`)
            .then((res) => {
                setSelectSearchResult(false);
                setSearchResult(res.data);
                if (res.data.length === 0){
                    setNotFound(true);
                } else {
                    setNotFound(false);
                }
            }).catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="row pt-5 mt-3 mx-0 justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                <form onSubmit={ Search }>
                    <div className="form-group">
                        <input type='text'
                            className="form-control pl-3 search-bar"
                            value={ cityName }
                            placeholder= "Search city"
                            onChange={ (e) => setCityName(e.target.value) }
                        />
                        <div className="form-group pt-4 text-center">
                            <input type="submit" value="Search" className="btn btn btn-primary search-btn" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchBar;