import csv
import math

filename = "combinations3.csv"
combinations = []

for col2 in range(1, 40,4):
     for col1 in range(1, 20,5):
          for col3 in range(50, 80,7):
            combinations.append([col2, col1, col3,math.floor(col1*col2*col3/32919)])

with open(filename, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["moisture,temperature,humidity,label"])
    writer.writerows(combinations)

print(f"CSV file '{filename}' has been generated.")


