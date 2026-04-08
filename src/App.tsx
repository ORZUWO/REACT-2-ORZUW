
const App = () => {
  const [open, setOpen] = useState(false)
  const [idx,setidx]=useState(null)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    }

const [data, setData] = useState([
  { id: 1, name: "Ali", age: 20, status: true },
  { id: 2, name: "Vali", age: 25, status: false },
  { id: 3, name: "Said", age: 18, status: true },
  { id: 4, name: "Jamshed", age: 30, status: false },
  { id: 5, name: "Farhod", age: 22, status: true },
  { id: 6, name: "Rustam", age: 28, status: false },
  { id: 7, name: "Dilshod", age: 19, status: true },
  { id: 8, name: "Kamol", age: 35, status: false }
]);


const {handleChange,handleSubmit,values,setValues,resetForm} = useFormik({
     initialValues: {
      name:"",
      age:"",
      status:true,
     },
     onSubmit: values => {
      if(idx==null){
        setData([...data,{id:Date.now(),...values}])
        handleClose()
      }
      else{
        setData(
          data.map((e)=>e.id==idx?{...e,...values}:e)
        )
        handleClose()
      }
      resetForm()
     },
   });

  return (
    <>

<h1>Salom</h1>



    </>
  )
}

export default App
