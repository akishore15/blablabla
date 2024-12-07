-- Create a new database
CREATE DATABASE spreadsheet_db;

-- Switch to the new database
USE spreadsheet_db;

-- Create a table to simulate a spreadsheet
CREATE TABLE spreadsheet (
    row_id INT AUTO_INCREMENT PRIMARY KEY,
    col1 VARCHAR(255),
    col2 VARCHAR(255),
    col3 VARCHAR(255),
    col4 VARCHAR(255),
    col5 VARCHAR(255)
);
-- Insert some sample data
INSERT INTO spreadsheet (col1, col2, col3, col4, col5) VALUES
('A1', 'B1', 'C1', 'D1', 'E1'),
('A2', 'B2', 'C2', 'D2', 'E2'),
('A3', 'B3', 'C3', 'D3', 'E3'),
('A4', 'B4', 'C4', 'D4', 'E4'),
('A5', 'B5', 'C5', 'D5', 'E5');
