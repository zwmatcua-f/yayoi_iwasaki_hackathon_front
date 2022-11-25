import { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';

type Contribution = {
    sender:string;
    receiver:string;
    message:string;
    point:number;
  }
  
  type User = {
     id:string;
     name:string;
     age:number;
  }
  
  type Props = {
    contributions: Contribution[]
    users: User[];
    selectedUser: User
  };
  
  
  
  export default function Timeline_ranking(props:Props) {
      const sentReq = "http://localhost:8000/totalpoint?name="+ props.selectedUser.name;
      console.log(sentReq);
    
      const [contributions, setContributions] = useState<Contribution[]>([]);
      const fetchContributions = async () => {
        try {
          const res = await fetch(sentReq);
          if (!res.ok) {
            throw Error(`Failed to fetch users: ${res.status}`);
          }
    
          const contributionsJSON = await res.json();
          const data: Contribution[] = Object.values(contributionsJSON);
          setContributions(data);
          console.log(contributions);
        } catch (err) {
          console.error(err);
        }
    
      };
    
    useEffect(() => {
      fetchContributions();
    },[]);

    
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {contributions.map((contribution)=>(
  
        <ListItem alignItems="flex-start">
          {contribution.point}
        </ListItem>
        ))}
      </List>
      );
    }

