from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from  models import User, PagSecreta

api = Blueprint("api", __name__)

@api.route('/register', methods=['POST'])
def register():
    
    data = request.get_json()
    
    print("Datos recibidos en backend:", data)  

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "El correo y la contraseña son obligatorios"}), 400

    
    found = User.query.filter_by(email=email).first()
    if found: 
        return jsonify
    
    
    user = User()
    user.email = email
    user.set_password(password)

    
    user.save()
    
    pagSecreta = PagSecreta(users_id=user.id)  
    pagSecreta.save()  

    return jsonify({"success": "Registro exitoso, inicie sesión"}), 200


@api.route('/login', methods=['POST'])
def login():
    
    email= request.json.get('email')
    password = request.json.get('password')
    
    if not email:
        return jsonify({ "error": "El email es requerido"}), 400
    if not password:
        return jsonify({"error": "La constraseña es requerida"}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({ "error": "Datos incorrectos"}), 401
    if not user.verify_password(password):
        return jsonify({ "error": "Datos incorrectos"}), 401
    
    access_token = create_access_token(identity=str(user.id))
    
    datos = {
        "access_token": access_token
    }
    
    return jsonify(datos), 200


""
@api.route('/pagsecreta', methods=['GET'])
@jwt_required()
def get_secreto():
    id = get_jwt_identity()
    user = User.query.get(id)
    
    return jsonify({
        "status": "success",
        "user": user.serialize()
    }), 200
    
@api.route('/pagsecreta', methods=['PUT'])
@jwt_required()
def update_secreto():
    id = get_jwt_identity()
    user  = User.query.get(id)
    data = request.get_json()
    
    user.pagsecreta.mensaje = data['mensaje'] if 'mensaje' in data else user.pagsecreta.mensaje
    
    user.save()
    
    return jsonify({
        "status": "success",
        "msg": "Mensaje actualizado",
        "user": user.serialize()
    }), 200
