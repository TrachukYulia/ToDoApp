
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Application.DTO;
using ToDoApp.Application.Interfaces;

namespace ToDoApp.Api.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CategoryResponse>> GetAll([FromQuery] int userId)
        {
            var categoryResponses = _categoryService.GetAll(userId);
            return Ok(categoryResponses);
        }

        [HttpPost]
        public ActionResult CreateCategory(CategoryRequest categoryRequest)
        {
            if (categoryRequest == null)
            {
                throw new ArgumentNullException();
            }
            _categoryService.Create(categoryRequest);
            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult<CategoryResponse> GetCategoryById(int id)
        {
            var categoryResponse = _categoryService.Get(id);

            return Ok(categoryResponse);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateCategory(int id, [FromBody] CategoryRequest categoryRequest)
        {
            _categoryService.Update(categoryRequest, id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteById(int id)
        {
            _categoryService.Delete(id);
            return NoContent();
        }
    }
}
