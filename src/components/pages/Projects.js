import Message from '../layout/Message'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'

import { useState, useEffect } from 'react'

import {useLocation} from 'react-router-dom'

import styles from './Projects.module.css'

function Projects(){
  
  const [projects, setProjects] = useState([])
  const [loadingRemove, setLoading] = useState(false)
  const [projectMessage, setMessage] = useState('')

  const location = useLocation()
  let message = ''
  if(location.state){
    message = location.state.message
  }

  useEffect(() => {
      setTimeout(()=>{
        fetch('http://localhost:5000/projects',{
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then((resp) => resp.json())
      .then((project) => {
      setProjects(project)
      setLoading(true)
      })
      .catch((err) => console.error(err))
      }, 300)
  }, [])

  function removeProject(id){

    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      }
    }).then((resp) => resp.json())
    .then((data) => {setProjects(projects.filter((project) => project.id !== id))
    setMessage('Projeto removido com sucesso!')}
    )
    .catch((err) => console.log(err))
  }

 return (
  <div className={styles.project_container}>
    <div className={styles.tittle_container}>
      <h1>Meu Projeto</h1>
      <LinkButton to='/newproject' text='Novo Projeto'/>
    </div>
    {message && <Message msg={message} type='sucess'/>}
    {projectMessage && <Message msg={projectMessage}  type='sucess'/>}
    <Container customClass='start'>
        {projects.length > 0 &&
        projects.map((project) => <ProjectCard
        id={project.id}
        name={project.name}
        budget={project.budget}
        category={project.category.name}
        key={project.id}
        handleRemove={removeProject}
        />  
        )
        }
        {!loadingRemove && <Loading/>}
    </Container>
    
  </div>
  
 );
}

export default Projects;