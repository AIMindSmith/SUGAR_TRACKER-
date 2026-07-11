// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from './assets/vite.svg'
// // import heroImg from './assets/hero.png'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <section id="center">
// //         <div className="hero">
// //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// //           <img src={reactLogo} className="framework" alt="React logo" />
// //           <img src={viteLogo} className="vite" alt="Vite logo" />
// //         </div>
// //         <div>
// //           <h1>Get started</h1>
// //           <p>
// //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// //           </p>
// //         </div>
// //         <button
// //           type="button"
// //           className="counter"
// //           onClick={() => setCount((count) => count + 1)}
// //         >
// //           Count is {count}
// //         </button>
// //       </section>

// //       <div className="ticks"></div>

// //       <section id="next-steps">
// //         <div id="docs">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#documentation-icon"></use>
// //           </svg>
// //           <h2>Documentation</h2>
// //           <p>Your questions, answered</p>
// //           <ul>
// //             <li>
// //               <a href="https://vite.dev/" target="_blank">
// //                 <img className="logo" src={viteLogo} alt="" />
// //                 Explore Vite
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://react.dev/" target="_blank">
// //                 <img className="button-icon" src={reactLogo} alt="" />
// //                 Learn more
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //         <div id="social">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#social-icon"></use>
// //           </svg>
// //           <h2>Connect with us</h2>
// //           <p>Join the Vite community</p>
// //           <ul>
// //             <li>
// //               <a href="https://github.com/vitejs/vite" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#github-icon"></use>
// //                 </svg>
// //                 GitHub
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://chat.vite.dev/" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#discord-icon"></use>
// //                 </svg>
// //                 Discord
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://x.com/vite_js" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#x-icon"></use>
// //                 </svg>
// //                 X.com
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#bluesky-icon"></use>
// //                 </svg>
// //                 Bluesky
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>

// //       <div className="ticks"></div>
// //       <section id="spacer"></section>
// //     </>
// //   )
// // }

// // export default App

// import { useState, useEffect } from "react";
// import "./App.css";
// import SearchBar from "./components/SearchBar";
// import ResultCard from "./components/ResultCard";
// import products from "./data/products.json";
// import { searchOpenFoodFacts } from "./utils/openFoodFacts";

// function App() {
//   const [query, setQuery] = useState("");
//   const [apiResults, setApiResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState(false);

//   // Local filter runs instantly on every keystroke
//   const localResults = products.filter(product =>
//     product.name.toLowerCase().includes(query.toLowerCase()) ||
//     product.brand.toLowerCase().includes(query.toLowerCase()) ||
//     product.category.toLowerCase().includes(query.toLowerCase())
//   );

//   // API fallback: only fires when local results are empty
//   // Debounced 600ms so it doesn't fire on every keystroke
//   useEffect(() => {
//     // Reset API state when query changes
//     setApiResults([]);
//     setApiError(false);

//     // Don't call API if query is short or local results exist
//     if (query.length < 3 || localResults.length > 0) return;

//     const timer = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const results = await searchOpenFoodFacts(query);
//         setApiResults(results);
//       } catch (err) {
//         setApiError(true);
//       } finally {
//         setLoading(false);
//       }
//     }, 600);

//     // Cleanup: cancel timer if user keeps typing
//     return () => clearTimeout(timer);
//   }, [query]);

//   // Combine: local first, API as fallback
//   const allResults = localResults.length > 0 ? localResults : apiResults;

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>🍬 Sugar Tracker</h1>
//         <p>Find out how many teaspoons of sugar are in your snack</p>
//       </header>

//       <main className="app-main">
//         <SearchBar value={query} onChange={setQuery} />

//         {query && (
//           <p className="search-hint">
//             Searching for: <strong>{query}</strong>
//             {localResults.length === 0 && apiResults.length > 0 && (
//               <span className="api-badge"> · via Open Food Facts</span>
//             )}
//           </p>
//         )}

//         <div className="results-area">
//           {loading ? (
//             <p className="placeholder-text">⏳ Searching online database...</p>
//           ) : query && allResults.length > 0 ? (
//             allResults.map(product => (
//               <ResultCard key={product.id} product={product} />
//             ))
//           ) : query && query.length >= 3 && !loading && apiError ? (
//             <p className="placeholder-text">
//               ⚠️ Couldn't reach online database. Check your connection.
//             </p>
//           ) : query && query.length >= 3 && !loading && allResults.length === 0 ? (
//             <p className="placeholder-text">❌ No products found</p>
//           ) : query && query.length < 3 ? (
//             <p className="placeholder-text">💬 Keep typing to search...</p>
//           ) : (
//             <p className="placeholder-text">
//               🔍 Type a product name above to get started
//             </p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";
import BarcodeScanner from "./components/BarcodeScanner";
import products from "./data/products.json";
import { searchOpenFoodFacts } from "./utils/openFoodFacts";
import { lookupBarcode } from "./utils/barcodeSearch";

function App() {
  const [query, setQuery] = useState("");
  const [apiResults, setApiResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedProduct, setScannedProduct] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState(null);

  const localResults = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setApiResults([]);
    setApiError(false);
    if (query.length < 3 || localResults.length > 0) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchOpenFoodFacts(query);
        setApiResults(results);
      } catch {
        setApiError(true);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [query]);

  const allResults = localResults.length > 0 ? localResults : apiResults;

  // Called when scanner successfully reads a barcode
  async function handleScanSuccess(barcode) {
    setShowScanner(false);
    setScanLoading(true);
    setScanError(null);
    setScannedProduct(null);
    setQuery(""); // clear search when scanning

    try {
      const product = await lookupBarcode(barcode);
      if (product) {
        setScannedProduct(product);
      } else {
        setScanError(`No product found for barcode: ${barcode}`);
      }
    } catch {
      setScanError("Could not look up barcode. Check your connection.");
    } finally {
      setScanLoading(false);
    }
  }

  function handleScanReset() {
    setScannedProduct(null);
    setScanError(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍬 Sugar Tracker</h1>
        <p>Find out how many teaspoons of sugar are in your snack</p>
      </header>

      <main className="app-main">
        <div className="search-row">
          <SearchBar value={query} onChange={(val) => {
            setQuery(val);
            setScannedProduct(null);
            setScanError(null);
          }} />
          <button
            className="scan-btn"
            onClick={() => setShowScanner(true)}
            title="Scan barcode"
          >
            📷
          </button>
        </div>

        {/* Scanner overlay */}
        {showScanner && (
          <BarcodeScanner
            onScanSuccess={handleScanSuccess}
            onClose={() => setShowScanner(false)}
          />
        )}

        {/* Barcode scan result */}
        {scanLoading && (
          <p className="placeholder-text">⏳ Looking up barcode...</p>
        )}
        {scanError && (
          <div className="scan-error-box">
            <p>❌ {scanError}</p>
            <button onClick={handleScanReset}>Try again</button>
          </div>
        )}
        {scannedProduct && (
          <div>
            <p className="search-hint">
              📷 Scanned result
              {scannedProduct.fromAPI && (
                <span className="api-badge"> · via Open Food Facts</span>
              )}
            </p>
            <ResultCard product={scannedProduct} />
          </div>
        )}

        {/* Search results (only show when not in scan mode) */}
        {!scannedProduct && !scanLoading && !scanError && (
          <>
            {query && (
              <p className="search-hint">
                Searching: <strong>{query}</strong>
                {localResults.length === 0 && apiResults.length > 0 && (
                  <span className="api-badge"> · via Open Food Facts</span>
                )}
              </p>
            )}

            <div className="results-area">
              {loading ? (
                <p className="placeholder-text">⏳ Searching online database...</p>
              ) : query && allResults.length > 0 ? (
                allResults.map(product => (
                  <ResultCard key={product.id} product={product} />
                ))
              ) : query && apiError ? (
                <p className="placeholder-text">
                  ⚠️ Couldn't reach online database. Check your connection.
                </p>
              ) : query && allResults.length === 0 && query.length >= 3 ? (
                <p className="placeholder-text">❌ No products found</p>
              ) : query && query.length < 3 ? (
                <p className="placeholder-text">💬 Keep typing...</p>
              ) : (
                <p className="placeholder-text">
                  🔍 Type a name or tap 📷 to scan
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;