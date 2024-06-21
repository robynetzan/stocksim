import matplotlib.pyplot as plt

# Given data
x_values = [0.1, 0.2, 0.4, 0.7]
y_values = [0.012, 0.008, 0.005, 0.001]

# Plotting the data
plt.plot(x_values, y_values, marker='o', linestyle='-', color='b', label='Data Points')

# Adding labels and title
plt.xlabel('X values')
plt.ylabel('Y values')
plt.title('Plot of X vs Y')
plt.legend()

# Display the plot
plt.grid(True)
plt.show()