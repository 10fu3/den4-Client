import React from 'react';

import './App.css';
import {
    AppBar, Avatar,
    Divider,
    Grid, IconButton,
    List,
    ListItemText, TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import faker from "faker";
import Range from "./Util/Range";
import { Virtuoso } from 'react-virtuoso'

class Room{
    name:string;
    id:number;

    constructor(id:number,name:string) {
        this.name = name;
        this.id = id;
    }
}

class Person{
    name:string;
    id:number;

    constructor(id:number,name:string) {
        this.name = name;
        this.id = id;
    }
}

class Message{
    uuid:string;
    wroteID:number;
    body:string;

    constructor(uuid:string,wroteID:number,body:string) {
        this.uuid = uuid;
        this.wroteID = wroteID;
        this.body = body;
    }
}

const App = ()=>{

    const [people,setPeople] = React.useState([] as Person[]);

    const [message,setMessage] = React.useState([] as Message[]);

    const [room,setRoom] = React.useState([] as Room[]);

    const [nowRoom,setNowRoom] = React.useState(0);

    const getUser = (message:Message):Person|null => {
        const v = people.filter(i=>i.id === message.wroteID);
        if(v.length === 0){
            return null;
        }
        return v[0];
    }

    const getRoom = (id:number):Room|null => {
        const v = room.filter(i=>i.id === id);
        if(v.length === 0){
            return null;
        }
        return v[0];
    }

    React.useEffect(()=>{
        setRoom(
            Range(0,10).map(i=>new Room(i,faker.music.genre()))
        );

        setPeople(
            Range(0,30).map(i=>new Person(i,faker.name.firstName()))
        );

        setMessage(
            Range(0,100).map(i=>new Message(`${i}`,Math.floor(Math.random()*10),faker.lorem.lines(Math.random() * 100)))
        );


        console.log(JSON.stringify(message.map(i=>i.wroteID)));
        console.log(JSON.stringify(people.map(i=>i.id)));
        console.log(message.length);
    },[]);


    return(
      <div>
          <AppBar position="static" style={{height:61,background:"#1453a4"}}>
              <Toolbar style={{width:"100%"}}>
                  <Typography variant="h5">
                      Den4 - {getRoom(nowRoom)?.name}
                  </Typography>
                  <IconButton style={{marginLeft:"auto",marginRight:"30px"}}>
                      <Avatar>
                          T
                      </Avatar>
                  </IconButton>
              </Toolbar>
          </AppBar>
          <Grid container>
              <Grid xs={3} style={{background:"#252525",maxWidth:220,minWidth:220}}>
                  <div style={{height:10}}/>
                  <Virtuoso style={{height: 'calc( 100vh - 64px)' }} followOutput={true} totalCount={room.length} itemContent={
                      index => {

                          const css:React.CSSProperties = {
                              marginLeft:20,marginBottom:20
                          }

                          css["color"] = index === nowRoom ? "white" : "gray";

                          return(<div onClick={_=>{setNowRoom(index)}}>
                              <List>
                                  <div style={css}>
                                      {"#"+ room[index].name}
                                  </div>
                                  <Divider/>
                              </List>
                          </div>);
                      }
                  } />
              </Grid>
              <Grid xs={6} style={{background:"#353535",color:"white",maxWidth:"calc( 100% - 440px )",minWidth:"calc( 100% - 440px )"}}>
                  <div style={{marginLeft:10,marginRight:10}}>
                      <Virtuoso style={{height: 'calc( 100vh - 125px)' }} followOutput={true} totalCount={message.length} itemContent={
                          index => {
                              const user = getUser(message[index]);
                              return(<div>
                                  <List style={{padding:0}}>
                                      <ListItemText>
                                          <Grid container>
                                              <Grid item style={{marginTop:8}}>
                                                  <Avatar>
                                                      {user?.name.charAt(0)}
                                                  </Avatar>
                                              </Grid>
                                              <Grid item style={{marginLeft:10}}/>
                                              <Grid item style={{margin:0}}>
                                                  <p>{user?.name}</p>
                                              </Grid>
                                              <Grid item style={{marginLeft:8}}/>
                                              <Grid item style={{margin:0,color:"gray"}}>
                                                  <p>12:34</p>
                                              </Grid>
                                          </Grid>
                                          <p style={{margin:0}}>{message[index].body}</p>
                                      </ListItemText>
                                      <Divider/>
                                  </List>
                              </div>)
                          }
                      } />
                  </div>
                  <TextField variant="outlined" style={{width:"calc(100% - 10px)",margin:5}} inputProps={{style:{color:"white"}}}>

                  </TextField>
              </Grid>
              <Grid xs={3} style={{background:"#252525",color:"white",maxWidth:220,minWidth:220}}>
                  <div style={{height:10}}/>
                  <Virtuoso style={{ height: 'calc( 100vh - 64px)' }} followOutput={true} totalCount={people.length} itemContent={
                      index => {
                          return(<div>
                              <List>
                                  <Grid container>
                                      <Grid item style={{width:10}}/>
                                      <Grid item>
                                          <Avatar>{people[index].name.charAt(0)}</Avatar>
                                      </Grid>
                                      <Grid item style={{width:10}}/>
                                      <Grid item style={{marginTop:10}}>
                                          {people[index].name}
                                      </Grid>
                                  </Grid>
                              </List>
                              <Divider/>
                          </div>)
                      }
                  } />
              </Grid>
          </Grid>
      </div>);
}

export default App;
