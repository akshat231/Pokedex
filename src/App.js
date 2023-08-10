
import './App.css';
import { AiFillSound,AiFillStar } from "react-icons/ai";
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeimageurl } from './PokeSlice';
import { type } from '@testing-library/user-event/dist/type';


function App() {
  const [name,Setname]=useState('');
  const [showimage,Setshowimage]=useState('https://s3-us-west-2.amazonaws.com/s.cdpn.io/200653/psykokwak.gif');
  const [shinyimage,Setshinyimage]=useState('https://s3-us-west-2.amazonaws.com/s.cdpn.io/200653/psykokwak.gif');
  const [shinycount,Setshinycount]=useState(0);
  const [searchcount,Setsearchcount]=useState(true);
  const [typename,Settypename]=useState('');
  var imageurl=useSelector((state)=>state.pokeurl.imageurl);
  const dispatch = useDispatch();
  

  async function handlewhosthatpokemon(placename) 
  {
    if(placename=='')
    {
      alert('Input Field Must be filled');
    }
    else{
    try{
     var url="https://pokeapi.co/api/v2/pokemon/"
     var placename=String(placename);
     placename=placename.toLowerCase();
    const res=await fetch(url+placename);
    const data=await res.json();
    Setsearchcount(false);
    Settypename(data['types'][0]['type']['name']);
    Setshowimage(data['sprites']['back_default'])
    Setshinyimage(data['sprites']['back_shiny'])
    dispatch(changeimageurl(data['sprites']['back_default']));
  }catch(e)
  {
      alert('Pokemon is not in DataBase');
  }
    }
  }

  function handlenewasearch()
  {
    Setsearchcount(true);
    dispatch(changeimageurl('https://s3-us-west-2.amazonaws.com/s.cdpn.io/200653/psykokwak.gif'));
  }


  function speakitoutloud()
  {
    if(searchcount==false)
    {
    const text=String(name)+' is a '+String(typename)+' type Pokemon';
    const value=new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
    }
  }


  function handleshiny()
  {
    if(shinycount%2==0)
    {
     
      Setshinycount(shinycount+1);
      dispatch(changeimageurl(shinyimage)); 
    }  
    else
    {
      Setshinycount(shinycount+1);
    dispatch(changeimageurl(showimage)); 
    }
  }
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }




  return (
    <>
      <div id="pokedex">
        <div id="left">
          <div id="logo"></div>
          <div id="bg_curve1_left"></div>
          <div id="bg_curve2_left"></div>
          <div id="curve1_left">
            <div id="buttonGlass">
              <div id="reflect"> </div>
            </div>
            <div id="miniButtonGlass1"></div>
            <div id="miniButtonGlass2"></div>
            <div id="miniButtonGlass3"></div>
          </div>
          <div id="curve2_left">
            <div id="junction">
              <div id="junction1"></div>
              <div id="junction2"></div>
            </div>
          </div>
          <div id="screen">
            <div id="topPicture">
              <div id="buttontopPicture1"></div>
              <div id="buttontopPicture2"></div>
            </div>
            <div id="picture">
              <img src={imageurl} alt="psykokwak" height="170" />
            </div>
            <div id="buttonbottomPicture"></div>
            <div id="speakers">
              <div class="sp"></div>
              <div class="sp"></div>
              <div class="sp"></div>
              <div class="sp"></div>
            </div>
          </div>
          <AiFillSound style={{
            fontSize: 100, position: 'absolute',
            top: 395,
            left: 30,
            cursor: 'pointer',
           }}
           onClick={(e)=>speakitoutloud()} />
          <div id="cross">
            <div id="leftcross">
              <div id="leftT"></div>
            </div>
            <div id="topcross">
              <div id="upT"></div>
            </div>
            <div id="rightcross">
              <div id="rightT"></div>
            </div>
            <div id="midcross">
              <div id="midCircle"></div>
            </div>
            <div id="botcross">
              <div id="downT"></div>
            </div>
          </div>
        </div>
        <div id="right">
          <div id="stats">
            {searchcount==true  &&
          <TextField id="standard-basic" label="Search a Pokemon" variant="standard"
          onChange={(e)=>{Setname(e.target.value)}}  value={name}
          />}
          {searchcount==false &&
          <span style={{fontSize:"20px"}}>{capitalizeFirstLetter(name)} is a {capitalizeFirstLetter(typename)} type Pokemon.</span>
          }
          </div>
          <div id="blueButtons2">
            <div class="blueButton"></div>
            <div class="blueButton"></div>
            <div class="blueButton"style={{cursor:'pointer'}} onClick={()=>handleshiny()}><AiFillStar style={{color:'yellow'}}/></div>
            <div class="blueButton"></div>
            <div class="blueButton"></div>
          </div>
          <div id="miniButtonGlass4"></div>
          <div id="miniButtonGlass5"></div>
          <div id="barbutton3"></div>
          <div id="barbutton4"></div>
         
          <div id="yellowBox1" onClick={(e)=>Setname("")}>
            <div className='textinfirstyellow' onClick={()=>handlenewasearch()}>New Search</div>
          </div>
          <div id="yellowBox2">
            <span className='textinsecondyellow' onClick={()=>handlewhosthatpokemon(name)} required>Who's that Pokemon</span>
          </div>
          <div id="bg_curve1_right"></div>
          <div id="bg_curve2_right"></div>
          <div id="curve1_right"></div>
          <div id="curve2_right"></div>
        </div>
      </div>
    </>
  );
}

export default App;
