# URL Performance Analyzer

A React web application that analyzes the performance of any given URL, measuring load time, page size, and number of HTTP requests.

## Features

- **Load Time Analysis**: Measures total page load duration
- **Page Size Breakdown**: Shows aggregate size of HTML, CSS, JS, and images
- **Request Count**: Displays total number of HTTP requests
- **Performance Grading**: Provides A-D grade based on load time
- **Resource Breakdown**: Visual breakdown of different resource types
- **Performance Recommendations**: Actionable suggestions for improvement
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with Next.js 14 (App Router)
- **Styling**: Tailwind CSS with shadcn/ui components
- **TypeScript**: Full type safety throughout the application
- **API**: Next.js API routes for backend functionality







## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Steps

1. **Clone the repository**
    ``` bash
   git clone <repository-url>
   cd url-performance-analyzer
    ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```


4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Enter a URL in the input field (with or without https://)
2. Click "Analyze Performance" to start the analysis
3. View the results including:
   - Overall performance grade (A-D)
   - Load time in seconds
   - Total page size
   - Number of HTTP requests
   - Resource breakdown by type
   - Performance recommendations

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │   └── route.ts          # API endpoint for performance analysis
│   ├── components/
│   │   └── PerformanceResults.tsx # Results display component
│   ├── types/
│   │   └── performance.ts        # TypeScript type definitions
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Main application page
│   └── globals.css              # Global styles
├── components/ui/               # shadcn/ui components
└── lib/
    └── utils.ts                 # 
```

## API Endpoints

### POST /api/analyze
Analyzes the performance of a given URL.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "loadTime": 1250,
  "pageSize": {
    "total": 1048576,
    "html": 20480,
    "css": 102400,
    "js": 512000,
    "images": 413696
  },
  "requestCount": 25,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "recommendations": [
    "Consider optimizing server response time",
    "JavaScript bundle size is large - consider code splitting"
  ]
}
```

## Performance Analysis Implementation

This application now uses **Google Lighthouse** for real website performance analysis, providing accurate and comprehensive metrics.

### Real Implementation Features:
- **Lighthouse Integration**: Uses Google's Lighthouse library for industry-standard performance auditing
- **Chrome Headless**: Launches Chrome in headless mode for consistent testing environment
- **Comprehensive Metrics**: Measures Speed Index, First Contentful Paint, Largest Contentful Paint
- **Resource Analysis**: Real breakdown of HTML, CSS, JavaScript, and image sizes
- **Smart Recommendations**: Generated based on actual Lighthouse audit results

### Key Metrics Analyzed:
- **Speed Index**: How quickly content is visually displayed
- **First Contentful Paint**: Time until first content appears
- **Largest Contentful Paint**: Time until largest element loads
- **Total Byte Weight**: Complete resource size analysis
- **Network Requests**: Actual HTTP request count and details

### Lighthouse Audits Used:
- Performance category audits
- Resource optimization checks
- Render-blocking resource detection
- Unused code identification
- Image optimization analysis
- Text compression evaluation

### Current Implementation:
```javascript
// Real Lighthouse implementation
import lighthouse from "lighthouse"
import { launch } from 'chrome-launcher'

async function analyzeWebsitePerformance(url) {
  const chrome = await launch({ chromeFlags: ["--headless"] })
  const options = {
    port: chrome.port,
    output: "json",
    onlyCategories: ["performance"]
  }
  
  const runnerResult = await lighthouse(url, options)
  const audits = runnerResult.lhr.audits
  
  // Extract real performance metrics
  const speedIndex = audits["speed-index"]?.numericValue || 0
  const totalBytes = audits["total-byte-weight"]?.numericValue || 0
  
  await chrome.kill()
  return performanceData
}
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms
- **Netlify**: Supports Next.js with build plugins
- **Railway**: Simple deployment with GitHub integration
- **Docker**: Use the included Dockerfile for containerized deployment

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Real performance analysis using Puppeteer/Lighthouse
- [ ] Historical performance tracking
- [ ] Comparison between multiple URLs
- [ ] Export results to PDF/CSV
- [ ] Performance monitoring alerts
- [ ] Mobile vs Desktop performance comparison
- [ ] Core Web Vitals integration
- [ ] Performance budget tracking

## Support

For questions or support, please open an issue in the GitHub repository.
