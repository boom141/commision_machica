from src import create_app
from config import Config

app = create_app()

@app.route('/testing')
def test_():
    return f'TESTING ON MACHICA WEBSITE ON {Config.SERVER}'


if __name__ == '__main__':
    app.run(debug=True, host=Config.SERVER)