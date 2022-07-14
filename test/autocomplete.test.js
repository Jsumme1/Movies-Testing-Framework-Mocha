const waitFor = (selector) => {
    return new Promise((resolve, reject) => {
       const interval = setInterval(() => {
        if (document.querySelector(selector)) {
            clearInterval(interval);
            clearTimeout(timeout);
            resolve();
        }
        }, 30);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            reject();
        }, 2000);
    });
}

beforeEach(() => {
    // allows for deletion and new creation of creatAutoComplet instance every time test is run
    document.querySelector('#target').innerHTML =   '';
createAutoComplete ({
    root: document.querySelector('#target'),
    fetchData () {
        return [
          { Title: "Avengers" },
          { Title: "Not Avengers" },
          { Title: "other movie" },
        ];
    },
    renderOption(movie) {
        return movie.Title;
    }
});
});

it('Dropdown starts closed', () => {
const dropdown = document.querySelector('.dropdown');
// chai library is an assertion library - in mocha - separate script
expect(dropdown.className).not.to.include('is-active');
    
});

it('After searching, dropdown opens up', async () => {
  const input = document.querySelector("input");
  input.value = "avengers";
  //  fakes DOM event for testing
  input.dispatchEvent(new Event("input"));
  //  test failed because of debounce function in original app - add helper function to wait for the even to happen before running test
  await waitFor(".dropdown-item");
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).to.include("is-active");
});

it("After searching,displays some results", async () => {
  const input = document.querySelector("input");
  input.value = "avengers";
  input.dispatchEvent(new Event("input"));
  await waitFor(".dropdown-item");
  const items = document.querySelectorAll(".dropdown-item");
  expect(items.length).to.equal(3);
});