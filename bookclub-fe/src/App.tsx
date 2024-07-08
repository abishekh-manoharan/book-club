import './App.css'
import { BookBrowse } from './components/BookBrowse';

function App() {
  const root = document.documentElement;
  const newClass = document.querySelector(".newClass") as HTMLElement;
  
  document.addEventListener("scroll", () => {
    const root = document.documentElement;
    console.log(root.scrollTop);
    console.log(root.clientHeight);



    const newClass = document.querySelector(".newClass");
    if (newClass) {
      console.log('newClass '+newClass?.scrollTop);
      console.log(newClass.clientHeight);
    }
  });

  return (<>
    <BookBrowse />
    <div style={{ "height": "200vh" }}></div>
    <div className="newClass" style={{ "height": "200vh" }}>
      Another class
    </div>

    <button onClick={() => {
      const newClass = document.querySelector(".newClass") as HTMLElement;
      // newClass!.setAttribute('style', 'height: 100vh;');
      newClass.style.setProperty('height', '100vh');
    }}>butt</button>
  </>
  );
}

export default App
