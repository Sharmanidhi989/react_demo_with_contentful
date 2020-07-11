 
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import * as contentful from "contentful";

const SPACE_ID = '@@@@@@@@@@@'
const ACCESS_TOKEN = '$$$$$$$$$$$$$$$$$$$$$$$$'

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});


function Course({ course, index, upvoteCourse, downvoteCourse }) {
  return (
    <div>
      <Card style={{maxWidth: '500px', marginBottom: '10px'}}>
        <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={ course.fields.courseImage.fields.file.url }
                    title={ course.fields.title }
                    />
        <CardContent>
          <Typography variant="headline" component="h2">{ course.fields.title }</Typography>
          <Typography component="p" color="textSecondary">{ course.fields.description }</Typography>
          <br />
        </CardContent>
        <CardActions>
          <Button size="small" href={ course.fields.url } target="_blank">Go To Course</Button>
        </CardActions>
      </Card>
    </div>
  )
}

function App() {
  const [courses, setCourses] = useState(0);

  useEffect(() => {
    getCourses();
  }, [] )

  const getCourses = () => {
    client.getEntries({
      content_type: 'courses'
    })
    .then((response) =>{
      setCourses(response.items)
    })
  }
  const upvoteCourse = index => {
    const newCourse = [...courses];
    newCourse[index].upvote_count++;
    setCourses(newCourse);
  };

  const downvoteCourse = index => {
    const newCourse = [...courses];
    newCourse[index].downvote_count++;
    setCourses(newCourse);
  };

  return (
    <div className="app">
      <div>
        { courses ? (
          <Grid container spacing={24} style={{padding: 24}}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={12} lg={4} xl={3}>
              <Course 
                key={index} 
                index={index} 
                course={course}
                />
            </Grid>
          ))}
        </Grid> ) : "no test"}
        
      </div>
    </div>
  )
}

export default App;
