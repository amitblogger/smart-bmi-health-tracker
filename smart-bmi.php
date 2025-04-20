<?php
/**
 * Plugin Name: Smart BMI & Health Tracker
 * Plugin URI: https://yourwebsite.com/
 * Description: A modern BMI calculator plugin with gender toggle, chart, health tips, and ideal weight range.
 * Version: 1.0.0
 * Author: AD Media Network
 * Author URI: https://yourwebsite.com/
 * License: GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Enqueue styles and scripts
function sbmi_enqueue_assets() {
    wp_enqueue_style( 'sbmi-style', plugins_url( 'style.css', __FILE__ ) );
    wp_enqueue_script( 'sbmi-chart', plugins_url( 'chart.js', __FILE__ ), array(), null, true );
    wp_enqueue_script( 'sbmi-jspdf', plugins_url( 'jspdf.min.js', __FILE__ ), array(), null, true );
    wp_enqueue_script( 'sbmi-script', plugins_url( 'script.js', __FILE__ ), array('jquery'), null, true );
}
add_action( 'wp_enqueue_scripts', 'sbmi_enqueue_assets' );

// Shortcode to render BMI Calculator
function sbmi_render_calculator() {
    ob_start();
    ?>
    <div id="sbmi-container" class="sbmi-wrapper">
        <h2 class="sbmi-title">Smart BMI & Health Tracker</h2>
        
        <div class="sbmi-inputs">
            <label>Gender:
                <select id="sbmi-gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </label>

            <label>Age:
                <input type="number" id="sbmi-age" placeholder="e.g. 30" min="1" max="120">
            </label>

            <label>Height (cm):
                <input type="number" id="sbmi-height" placeholder="e.g. 170" min="50" max="250">
            </label>

            <label>Weight (kg):
                <input type="number" id="sbmi-weight" placeholder="e.g. 70" min="20" max="300">
            </label>

            <button id="sbmi-calculate">Calculate BMI</button>
        </div>

        <div class="sbmi-results" style="display: none;">
            <canvas id="sbmi-chart" width="400" height="200"></canvas>
            <div id="sbmi-bmi-score"></div>
            <div id="sbmi-category"></div>
            <div id="sbmi-tips"></div>
            <button id="sbmi-pdf-export">Export as PDF</button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'smart_bmi_calculator', 'sbmi_render_calculator_
