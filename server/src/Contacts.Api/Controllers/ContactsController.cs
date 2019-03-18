using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Contacts.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Contacts.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<ContactModel>> Get(string filter = null)
        {
            Thread.Sleep(5000);
            var contacts = new ContactModel[]
            {
                new ContactModel { Id = 1, Name = "Erhan Cakirman", PhoneNumber = "+61540654888" },
                new ContactModel { Id = 2, Name = "Evren Kayali", PhoneNumber="+61467214630" },
                new ContactModel { Id = 3, Name = "Omer Kaya", PhoneNumber="+905326107664" },
                new ContactModel { Id = 4, Name = "Ali Bakir", PhoneNumber="+61467214630" },
                new ContactModel { Id = 5, Name = "Banu Cevik", PhoneNumber="+61467214630" },
            };

            var result = filter == null
            ? contacts
            : contacts.Where(c => c.Name.StartsWith(filter));

            return Ok(result);
        }
    }
}
