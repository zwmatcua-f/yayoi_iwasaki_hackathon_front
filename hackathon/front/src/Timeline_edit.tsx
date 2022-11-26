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
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';

type Contribution = {
  contribution_id:string;
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

type Update ={
  update_id:string;
	new_message:string;
}

type Props = {
  // contributions: Contribution[]
  contribution:Contribution
  // users: User[];
  // selectedUser: User
};


export default function Timeline_edit(props:Props){
    
        const onEdit = async (e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // const [update, setUpdate] = useState<Update>();
          const new_message  = window.prompt("Enter new message.", "") as string; 
          
          // setUpdate({
          //   new_message: newMessage,
          //   update_id: props.contribution.contribution_id
          // })

          const update_id=props.contribution.contribution_id

          if (new_message.length > 200) {
            alert("Please enter message shorter than 200 characters");
            return;
          }
          
          try {
            const result = await fetch("http://localhost:8000/timeline", {
              method: "PUT",
              body: JSON.stringify({
                update_id,
                new_message
              }),
            });
            if (!result.ok) {
              throw Error(`Failed to edit: ${result.status}`);
            }
      
          } catch (err) {
            console.error(err);
          }
        }
    


          const onDelete = async (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const delete_id=props.contribution.contribution_id
            try {
              const result = await fetch("http://localhost:8000/timeline", {
                method: "DELETE",
                body: JSON.stringify({
                  delete_id
                }),
              });
              if (!result.ok) {
                throw Error(`Failed to delete: ${result.status}`);
              }
        
            } catch (err) {
              console.error(err);
            }
          }
      
        
      

    return (
        <Box>  
          <Button  onClick={onEdit} >
            <Fab size="small" color="secondary" aria-label="edit">
              <EditIcon/>
         　 </Fab>
         </Button>
          <Button  onClick={onDelete} >
            <Fab size="small" color="primary" aria-label="add">
              <DeleteIcon />
            </Fab>
          </Button>
        </Box>
      );
    }
