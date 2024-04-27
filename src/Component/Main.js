import react, { useEffect, useState } from "react";

import "../App.css";
import Card from "./Card";

let API_key = "&api_key=7b71ae6a31166f96347f9ed964916122";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
// let arr = ["Popular", "Top Rated", "Upcoming"];
let arr=["Popular","Top Rated","Upcoming"];
const Main = () => {

    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState();
    useEffect(() => {
        fetch(url_set).then(res => res.json()).then(data => {
            setData(data.results);

        });
    }, [url_set])

    const getData=(movieType)=>{
        

        if(movieType=="Popular")
        {
            url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
        }
        if(movieType=="Top Rated")
        {
            url=base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key;
        }
      
        if(movieType=="Upcoming")
        {
            url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"+API_key;
        }
        setUrl(url);

    }

    const searchMovie=(evt)=>{
        if(evt.key=="Enter")
        {
            url=base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }

    return (


        <div>
            <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
                <div className="container" id="Navbar">
                    <a className="navbar-brand text-white" href="#">MovieDb</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >

                        {
                            arr.map((value,pos)=>{
                                return(
                                    <li><a className="nav-link text-white" href="#" key={pos} name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }

                           
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Movie Name" aria-label="Search" onChange={(e)=>{setSearch(e.target.value)}} 
                        value={search} onKeyPress={searchMovie} />
                            <button className="btn btn-secondary" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            </div>
            <div className="container mt-5">

                {
                    (movieData.length == 0) ? <p className="Not Found">Not Found</p> : movieData.map((res, pos) => {
                        return (
                            <Card info={res} key={pos} />
                        )
                    })
                }



            </div>

        </div>
    )
}
export default Main;