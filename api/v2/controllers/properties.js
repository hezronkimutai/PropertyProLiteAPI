import db from '../models/query';
import Validator from '../helpers/Validator';

class PropertyController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  postPropertiesController() {
    try {
      const validator = new Validator(this.req, this.res);
      if (!this.req.body.type
       || !this.req.body.price
       || !this.req.body.state
       || !this.req.body.city
       || !this.req.body.address
       || !this.req.body.imageurl) {
        return this.res.status(400).json({ status: '400', Error: 'Please fill all the this.required this.req.body.' });
      }
      if (!validator.Property()) {
        const propertyQuery = `INSERT INTO  properties(owner,
           price, state, city, address, type, imageurl)
           VALUES('${this.req.body.owner}', '${this.req.body.price}',
            '${this.req.body.state}',  '${this.req.body.city}', 
            '${this.req.body.address}', '${this.req.body.type}', 
            '${this.req.body.imageurl}')`;

        db.query(propertyQuery, (err, result) => {
          this.res.status(201).json({
            status: '201',
            message: 'Property created Succesfully',
            data: this.req.body,
          });
        });
      }
    } catch (err) {
      return this.res.status(500).json({
        status: 500,
        Error: err,
      });
    }
  }

  postFlagController() {
    const validator = new Validator(this.req, this.res);
    try {
      if (!this.req.body.reason || !this.req.body.description || !this.req.body.mappoints) {
        return this.res.status(400).json({
          status: '400',
          Error: 'Please fill all the this.required this.req.body.',
        });
      }
      if (!validator.Flag()) {
        const thisFlag = `select * from properties where id = '${this.req.params.id}'`;
        const flagQuery = `INSERT INTO  flags(reason, description, mappoints, propertyid)
         VALUES('${this.req.body.reason}','${this.req.body.description}', '${this.req.body.mappoints}', '${this.req.params.id}')`;
        db.query(thisFlag, (err, result) => {
          if (result === undefined || result.rows.length === 0) {
            return this.res.status(404).json({
              status: 404,
              message: 'Property not found',
            });
          } if (result.rows[0].owner === this.req.body.owner) {
            db.query(flagQuery, () => this.res.status(201).json({
              status: 201,
              message: 'flag created Succesfully',
              data: result.rows[0],
            }));
          } else {
            this.res.status(401).json({
              status: 401,
              Error: 'Unauthorized',
            });
          }
        });
      }
    } catch (err) {
      return this.res.status(500).json({
        status: 500,
        Error: err,
      });
    }
  }

  getPropertiesController() {
    try {
      const propertiesQuery = 'SELECT * from properties  where status= \'available\'';
      db.query(propertiesQuery, (err, result) => {
        if (result.rows.length === 0) {
          return this.res.status(404).json({
            status: 404,
            Error: 'Property not found',
          });
        }
        this.res.status(200).json({
          status: 200,
          message: 'properties retrieved succesfully',
          data: result.rows,
        });
      });
    } catch (err) {
      return this.res.status(500).json({
        status: 500,
        Error: err,
      });
    }
  }

  getPropertyController() {
    try {
      const propertyQuery = `SELECT * from properties WHERE id='${this.req.params.id}'`;
      db.query(propertyQuery, (err, result) => {
        if (isNaN(this.req.params.id)) {
          return this.res.status(405).json({
            status: 405,
            Error: 'Invalid property',
          });
        }
        if (result === undefined || result.rows.length === 0) {
          return this.res.status(404).json({
            status: 404,
            Error: 'Property not found',
          });
        }
        if (result.rows[0].status === 'sold') {
          return this.res.status(400).json({
            status: 400,
            Error: 'Ooops!! the property has been sold.',
          });
        }
        return this.res.status(200).json({
          status: 200,
          message: 'properties retrieved succesfully',
          data: result.rows[0],
        });
      });
    } catch (err) {
      return this.res.status(500).json({
        status: 500,
        Error: err,
      });
    }
  }

  getPropertyTypeController() {
    try {
      const propertyQuery = `SELECT * from properties WHERE type ='${this.req.params.type}'`;
      db.query(propertyQuery, (err, result) => {
        if (result === undefined || result.rows.length === 0) {
          return this.res.status(404).json({
            status: 404,
            Error: 'Property not found',
          });
        }
        this.res.status(200).json({
          status: '200',
          message: `properties of type ${this.req.params.type} retrieved succesfully`,
          data: result.rows,
        });
      });
    } catch (err) {
      return this.res.status(500).json({
        status: 500,
        Error: err,
      });
    }
  }

  updatePropertyController() {
    try {
      if (isNaN(this.req.params.id)) {
        return this.res.status(405).json({
          status: 405,
          Error: 'Method not allowed',
        });
      }
      const confirmIfFoundProperty = `select * from properties where id = '${this.req.params.id}'`;
      db.query(confirmIfFoundProperty, (_err, result) => {
        if (result === undefined || result.rows === 0) {
          return this.this.res.status(404).json({
            status: 404,
            Error: 'Property not found',
          });
        }
        if (result.rows[0].owner === this.req.body.owner) {
          Object.assign(result.rows[0], this.req.body);
          this.req.body = result.rows[0];
          delete this.req.body.createdon;
          const validator = new Validator(this.req, this.res);
          if (!validator.Property()) {
            Object.keys(this.req.body).forEach((key) => {
              const updateProperty = `UPDATE properties SET ${key} = '${this.req.body[key]}' where id = '${this.req.params.id}'`;
              db.query(updateProperty);
            });
            const confirmIfFound = `select * from properties where id = '${this.req.params.id}'`;
            db.query(confirmIfFound, (_err, resut) => this.res.status(201).json({
              status: 201,
              message: 'Property successfully updated',
              data: resut.rows[0],
            }));
          }
        } else {
          return this.res.status(401).json({
            status: 401,
            Error: 'Unauthorized',
          });
        }
      });
    } catch (err) {
      return this.res.status(500).json({
        status: 500,
        Error: err,
      });
    }
  }

  deletePropertyController() {
    try {
      const deletePropertyQuery = `DELETE FROM properties WHERE id='${this.req.params.id}'`;
      const thisUser = `select * from properties where id= '${this.req.params.id}'`;
      db.query(thisUser, (_err, result) => {
        if (result === undefined || result.rows.length === 0) {
          return this.res.status(404).json({
            status: 404,
            Error: 'Property not found',
          });
        }
        if (result.rows[0].owner === this.req.body.owner) {
          db.query(deletePropertyQuery, (_err, result) => this.res.status(201).json({
            status: '201',
            message: 'properties deleted succesfully',
          }));
        } else {
          this.res.status(401).json({
            status: 401,
            Error: 'Unauthorized',
          });
        }
      });
    } catch (err) {
      return this.res.status(500).json({
        status: 500,
        Error: err,
      });
    }
  }
}

export default PropertyController;
