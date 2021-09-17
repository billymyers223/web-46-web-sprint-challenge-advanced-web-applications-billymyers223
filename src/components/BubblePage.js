import React, { useEffect, useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  useEffect(() =>{
    fetchColorService().then(res =>{
      setColors(res.data);
    })
  }, [])
  const toggleEdit = (value) => {
    console.log(value)
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    setEditing(true);

    axiosWithAuth().put(`api/colors/${editColor.id}`, editColor)
      .then(res => {
        console.log(res)
        let Index = colors.findIndex((color) => color.id === editColor.id);

        colors[Index] = editColor
        setColors([...colors])
        setEditing(false);
      })
      .catch(err =>console.error(err))
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`/api/colors/${colorToDelete.id}`)
      .then(res =>{
        console.log(res.data)
        setColors(colors.filter(color => color.id !== colorToDelete.id))
      }).catch(err=> console.error(err))
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
