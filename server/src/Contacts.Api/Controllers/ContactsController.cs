using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public ActionResult<IEnumerable<ContactModel>> Get()
        {
            var contacts = new ContactModel[]
            {
                new ContactModel { Id = 1, Name = "Erhan Cakirman", PhoneNumber = "+61540654888" },
                new ContactModel { Id = 2, Name = "Evren Kayali", PhoneNumber="+61467214630" },
                new ContactModel { Id = 3, Name = "Omer Kaya", PhoneNumber="+905326107664" },
                new ContactModel { Id = 4, Name = "Evren Kayali", PhoneNumber="+61467214630" },
                new ContactModel { Id = 5, Name = "Evren Kayali", PhoneNumber="+61467214630" },
            };

            return Ok(contacts);
        }
    }
}
