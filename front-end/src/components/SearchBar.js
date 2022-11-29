import { HiExclamationCircle } from 'react-icons/hi';
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
        <div className="row pt-5 mx-0 justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                <form onSubmit={ Search }>
                    <div className="form-group">
                        <input type='text'
                            className="form-control pl-3"
                            value={ cityName }
                            placeholder="Search city"
                            onChange={ (e) => setCityName(e.target.value) }
                        />
                        <div className="row">
                            <div className="col-2 pr-0 mt-2 text-center">
                                <HiExclamationCircle className="note-icon"/>
                            </div>
                            <div className="col-10 px-0 mt-2">
                                <p className="advice-text mb-0">Please try to include country code for more accurate searching since there are countries that shares the same city name. Example, "London, GB" and "London, US".</p>
                            </div>
                        </div>
                        <div className="form-group pt-3 text-center">
                            <input type="submit" value="Search" className="btn btn btn-primary search-btn" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchBar;