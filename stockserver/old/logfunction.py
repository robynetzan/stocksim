import numpy as np
import matplotlib.pyplot as plt

# Given coefficients (example values, replace with your actual coefficients)
a = -0.005492238572768125
b = -0.0006192987066242405

# Original data (example data)
x_values = np.array([0.1, 0.2, 0.4, 0.7])
y_values = np.array([0.012, 0.008, 0.005, 0.001])

# Define the logarithmic function (ln)
def logarithmic_ln(x):
    return a * np.log(x) + b

# Generate points for plotting the fitted curve
x_fit = np.linspace(min(x_values), max(x_values), 100)
y_fit = logarithmic_ln(x_fit)

# Plotting the data points and fitted curve
plt.scatter(x_values, y_values, color='blue', label='Data Points')
plt.plot(x_fit, y_fit, color='red', label=f'Fitted ln(x) Curve: y = {a:.2f} * ln(x) + {b:.2f}')
plt.xscale('log')  # Set x-axis to logarithmic scale
plt.yscale('linear')  # Set y-axis to linear scale (since y = a * ln(x) + b is linear in terms of y)
plt.xlabel('X values')
plt.ylabel('Y values')
plt.title('Logarithmic Fit (ln(x))')
plt.legend()
plt.grid(True)
plt.show()