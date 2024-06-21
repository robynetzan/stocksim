import matplotlib.pyplot as plt, mpld3
import numpy as np
import sys
import json
import random

json_file = 'out.json'

# Function to load JSON from file
def load_json_file(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data

# Example usage
data = load_json_file(json_file)

def generate_random_color_hex():
    # Generate random RGB values
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    
    # Convert to hexadecimal format
    color_hex = "#{:02x}{:02x}{:02x}".format(r, g, b)
    
    return color_hex

# Example data (replace these with your own arrays)
x_values = np.arange(len(data[0]['data']))  # Example x values (could be time points, indices, etc.)

# Plotting
plt.figure(figsize=(10, 6))

for stock in data:
    plt.plot(x_values, np.array(stock['data']), marker='', linestyle='-', color=generate_random_color_hex(), label=stock['name'])
    
plt.ylim(bottom=0)

plt.title('Line Graph with Three Arrays')
plt.xlabel('X values')
plt.ylabel('Y values')
plt.grid(True)
plt.legend()

plt.tight_layout()
mpld3.show()