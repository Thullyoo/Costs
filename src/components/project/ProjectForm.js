import {useState , useEffect} from 'react';
import styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import Submit from '../form/Submit';

function ProjectForm({ btnText, handleSubmit, projectData }){
  const [categories, setCategories] = useState([])

  const [project, setProject] = useState(projectData || {})

  useEffect(() => { 
    fetch('http://localhost:5000/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json() )
    .then((categorias) => setCategories(categorias))
    .catch((err) => console.log(err))
  }, [])
  
  const submit = (e) =>{
    e.preventDefault();
    handleSubmit(project)
    console.log(project)
  }

  function handleChange(e) {
    setProject({...project, [e.target.name]: e.target.value})
  }
  function handleCategory(e) {
    setProject({...project, category : {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    },
    })
  }
 return (
  <form onSubmit={submit} className={styles.form}>
  <div>
  <Input type='text' text='Nome do projeto' name='name' placeholder='Insira o nome do projeto' handleOnChange={handleChange} value={project.name ? project.name : ''}/>
  </div>
  <div> 
  <Input type='number' text='Orcamento do projeto' name='budget' placeholder='Insira o orçamento total' handleOnChange={handleChange} value={project.budget ? project.budget : ''}/>
  </div>
  <div>
  <Select name='category_id' text='Selecione a categoria' options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
  </div>
  <div>
    <Submit type="submit" text={btnText} />
  </div>
  </form>
 )
}
export default ProjectForm;