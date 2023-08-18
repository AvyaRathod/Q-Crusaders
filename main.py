import numpy as np
from qiskit import QuantumCircuit, transpile, Aer
from qiskit.circuit.library import ZFeatureMap
from qiskit.visualization import circuit_drawer
import cv2

# Define the image as a 2D array of pixel values
image_pixels = cv2.imread("./archive/train/angry/Training_3908.jpg")

# Create a ZFeatureMap circuit
num_qubits = image_pixels.size
z_feature_map = ZFeatureMap(num_qubits*2)

# Encode the image pixels into the circuit
for i in range(image_pixels.shape[0]):
    for j in range(image_pixels.shape[1]):
        pixel_value = image_pixels[i, j]
        qubit_index = i * image_pixels.shape[1] + j
        z_feature_map = z_feature_map.bind_parameters({z_feature_map.parameters[qubit_index]: pixel_value})

# Print the circuit
print(z_feature_map)

# Transpile the circuit for simulation
simulator = Aer.get_backend('statevector_simulator')
transpiled_circuit = transpile(z_feature_map, simulator)

# Draw the transpiled circuit
circuit_drawer(transpiled_circuit, output='mpl').show()
