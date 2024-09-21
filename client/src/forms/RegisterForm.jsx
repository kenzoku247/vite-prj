import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Form, Input, Select, Col, Row } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import useLanguage from '@/hooks/useLanguage';
import { countryList } from '@/utils/countryList';
import { useSelector } from "react-redux";

export default function RegisterForm({ userLocation }) {
  const translate = useLanguage();
  
  return (
    <div className='register_form'>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label={translate('first_name')}
            rules={[
              {
                required: true,
                message: 'Please enter your first name!'
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label={translate('last_name')}
            rules={[
              {
                required: true,
                message: 'Please enter your last name!'
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="username"
        label={translate('username')}
        rules={[
          {
            required: true,
            message: 'Please enter your username!'
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" />
      </Form.Item>
      <Form.Item
        name="email"
        label={translate('email')}
        rules={[
          {
            required: true,
          },
          {
            type: 'email',
            message: 'Please enter your email!'
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          type="email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label={translate('password')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} size="large" />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label={translate('confirm_password')}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} size="large" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={translate('gender')}
            name="gender"
            rules={[
              {
                required: true,
                message: 'Please select your gender!'
              },
            ]}
            initialValue='Male'
          >
            <Select
              showSearch
              defaultOpen={false}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
              }
              style={{
                width: '100%',
              }}
              size="large"
            >
              {['Male', 'Female'].map((gender) => (
                <Select.Option
                  key={gender}
                  value={gender}
                  label={translate(gender)}
                >
                  {translate(gender)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>

          <Form.Item
            label={translate('country')}
            name="country"
            rules={[
              {
                required: true,
                message: 'Please select your country!'
              },
            ]}
            initialValue={userLocation}
          >
            <Select
              showSearch
              defaultOpen={false}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
              }
              style={{
                width: '100%',
              }}
              size="large"
            >
              {countryList.map((language) => (
                <Select.Option
                  key={language.value}
                  value={language.value}
                  label={translate(language.label)}
                >
                  {language?.icon && language?.icon + ' '}
                  {translate(language.label)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

        </Col>
      </Row>
      
    </div>
  );
}
