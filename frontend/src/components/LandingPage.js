import React from 'react';
import '../static/LandingPage.css'; // Assuming you have a separate CSS file for styles

function LandingPage() {
  return (
    <div className="landing-page">
            <div className="prototype-hint">
        Note!! This platform is just a prototype. Feel free not to add any personal data.
      </div>
      <h1>Welcome to the AI Ethics Assessment Platform</h1>

      <div className="steps">
        <h2>How It Works:</h2>
<div className="step">
<p>📦1. Start by Clicking <a href="/add-product">Add Product</a> to check the New Format of the Assessment </p>

</div>
<div className="step">
  <p>📝 2. <a href="/survey"> Share Your Feedback about the New format of the Assessment.</a>.</p>
</div>

      </div>

      <div className="feedback-section">
        <h3>We Value Your Opinion!</h3>
        <p>Please share your thoughts with us by clicking the button below.</p>
        <a href="/survey" className="feedback-button">
          Fill Out Feedback Form
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
