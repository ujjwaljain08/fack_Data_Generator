import React,{useState} from 'react';
import {options,dataTemplate} from "./data/option";
import 
{Grid,Paper,Box,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Chip,
    MenuItem,
    makeStyles,Button} from "@material-ui/core";
    
import faker from "faker";
import download from "downloadjs";

 const categories=Object.keys(options);



const usedStyles=makeStyles(theme =>({
    FormControl:{
        minWidth:"100%"
    },
    chips:{
        display:"flex",
        flexWrap:"wrap"
    },
    chip:{
        margin:2,
    }

}),)

const Form = (props) => {
    const classes=usedStyles();
    const [data, setData] = useState(dataTemplate);
    const [numberofdata, setNumberOfData] = useState(1)
    const handleChange=(event)=>{
       
        console.log(event.target.name,event.target.value);
        let copyData={...data };
        copyData[event.target.name]={}
        event.target.value.forEach(item =>{
            copyData[event.target.name][item]="";
        })
        setData(copyData);
    };
    const generatData=()=>{
        let copyData=options;
        let array=[];
        for(let i=0;i<numberofdata;i++){
            for(let category of categories){
                for(let key of Object.keys(options[category])){
                    if(data[category][key]!=undefined){
                        copyData[category][key]=faker[category][key]();
                    }
                }
           }
           array.push(copyData);
           copyData=options;
        }
         download(JSON.stringify(array),"Fake_Data.json","json")
         setNumberOfData(1);
         setData(dataTemplate)
    }
    
    return (
        <>
            <div>
            <Grid container spacing={2}>
                {
                   categories.map(category =>(
                       <Grid item sm={3}>
                        <Paper component={Box} p={3}>
                           <FormControl className={classes.FormControl}>
                               <InputLabel>{category}</InputLabel>
                               <Select 
                               renderValue={(sel)=>(
                                   <div className={classes.chips}>
                                       {
                                        sel.map((value)=>(
                                            <Chip className={classes.chip} key={value} label={value} />
                                        ))

                                       }
                                   </div>
                               )}
                               name={category}
                               fullWidth
                               multiple
                               value={Object.keys(data[category])}
                               onChange={handleChange}
                               >
                                {
                                    Object.keys(options[category]).map(name =>(
                                       <MenuItem key={name} value={name}>{name}</MenuItem>

                                    ))
                                   
                                }
                             
                               </Select>
                           </FormControl>
                       </Paper>
                       </Grid>
                       
                      
                   )) 
                }
            </Grid>
        </div>
        <Paper component={Box} my={1} p={3}>
            <TextField fullWidth value={numberofdata}
             onChange={(e) =>setNumberOfData(e.target.value)} 
             variant="outlined" label="enter the no. fake data"
              placeholder="enter the no."
              
              > </TextField>
                
        </Paper><Button variant="contained" color="secondary"
                onClick={generatData}>Click To Get</Button>

        </>
    );
}
//working
export default Form;
