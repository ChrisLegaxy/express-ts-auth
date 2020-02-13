/**
 * @file
 *
 * @description
 *
 * @author       Chris <chris.legaxy@gmail.com>
 * @copyright    CPC
 * @since        1.0.0
 * @version      1.0.0
 */

import { Request, Response } from 'express';

import User from '../../../models/User';

class Register {
  public static perform(req: Request, res: Response): any {
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
      email,
      password
    });

    /** Check if this user exists before registration */
    User.findOne({ email }, async (err, existingUser) => {
      /** Error Handling */
      if (err) {
        return res.json({
          error: err
        });
      }

      /** Check if user exists */
      if (existingUser) {
        return res.status(403).json({
          success: false,
          status: '403 Forbidden',
          message: 'Account with email already exists'
        });
      }

      /** Save user to the database */
      await user.save(err => {
        if (err) {
          return res.status(422).json({
            success: false,
            status: 422,
            message: 'An error occured during registration',
            error: err
          });
        }

        return res.json({
          success: true,
          status: 200,
          message: 'You have successfully registered with us',
          data: user
        });
      });
    });
  }
}

export default Register;
