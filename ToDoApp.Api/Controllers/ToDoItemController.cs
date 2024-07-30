using Microsoft.AspNetCore.Mvc;
using ToDoApp.Application.Interfaces;
using ToDoApp.Application.DTO;


namespace ToDoApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemController : ControllerBase
    {
        private IToDoItemServices _toDoItemServices;
        public ToDoItemController(IToDoItemServices toDoItemServices)
        {
            _toDoItemServices = toDoItemServices;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ToDoItemResponse>> GetAll()
        {
            IEnumerable<ToDoItemResponse> toDoItemResponses = _toDoItemServices.GetAll();
            return Ok(toDoItemResponses);
        }

        [HttpPost]
        public ActionResult CreateToDoItem(ToDoItemRequest toDoItemRequest)
        {
            if (toDoItemRequest == null)
            {
                throw new ArgumentNullException();
            }
            _toDoItemServices.Create(toDoItemRequest);
            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult<ToDoItemResponse> GeToDoItemById(int id)
        {
            var toDoItemResponse = _toDoItemServices.Get(id);

            return Ok(toDoItemResponse);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateToDoItem(int id, [FromBody] ToDoItemUpdate toDoItemRequest)
        {
            _toDoItemServices.Update(toDoItemRequest, id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteById(int id)
        {
            _toDoItemServices.Delete(id);
            return NoContent();
        }
    }
}
