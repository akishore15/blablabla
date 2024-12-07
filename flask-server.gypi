from flask import Flask, render_template, request, redirect
import MySQLdb

app = Flask(__name__)

db = MySQLdb.connect("localhost", "root", "password", "spreadsheet_db")
cursor = db.cursor()

@app.route('/')
def index():
    cursor.execute("SELECT * FROM spreadsheet")
    data = cursor.fetchall()
    return render_template('index.html', data=data)

@app.route('/update', methods=['POST'])
def update():
    row_id = request.form['row_id']
    col = request.form['col']
    value = request.form['value']
    cursor.execute(f"UPDATE spreadsheet SET {col} = %s WHERE row_id = %s", (value, row_id))
    db.commit()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
