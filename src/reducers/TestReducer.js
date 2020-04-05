const initialState = {
    isModalOpen:false,
    tasks:[    
          {
              taskName:"Demo task ",
              taskDescription:"Demo task description",
          },
      ]
  }
  
  const TestReducer=(state = initialState, action) => {
    switch(action.type) {
      case 'ADD_TASK_MODAL':
        return {
          ...state,
          isModalOpen:action.val,
        }
      
      case 'ADD_TASK':
          return{
              ...state,
              tasks: state.tasks.concat(action.item)
          }
  
      default:
        return state
    }
  }
  
  export default TestReducer;