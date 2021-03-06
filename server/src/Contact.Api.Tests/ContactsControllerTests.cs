using System.Collections.Generic;
using System.Linq;
using Contacts.Api.Controllers;
using Contacts.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace Contact.Api.Tests {
    public class ContactsControllerTests {
        private readonly ContactsController _contactsController;

        public ContactsControllerTests () {
            _contactsController = new ContactsController ();
        }

        [Fact]
        public void Get_Should_Return_Success_Result () {
            var actual = _contactsController.Get ();
            Assert.IsType<OkObjectResult> (actual.Result);
        }

        [Fact]
        public void Get_Should_Return_ContactList () {
            var actual = _contactsController.Get ().Result as OkObjectResult;
            Assert.IsAssignableFrom<IEnumerable<ContactModel>> (actual.Value);
        }

        [Fact]
        public void GetWithFilter_Should_Return_FilteredContactList()
        {
            var response = _contactsController.Get("Evr").Result as OkObjectResult;
            var result = response.Value as IEnumerable<ContactModel>;
            var actual = result.Single().Name;
            var expected = "Evren Kayali";
            Assert.Equal(expected, actual);
        }

        
    }
}