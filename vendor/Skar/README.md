Mandango module for Zend Framework 2
========

[Mandango](http://mandango.org/)

## Documentation

## Installation

Installation of Mandango Module uses composer.
For composer documentation, please refer to [getcomposer.org](http://getcomposer.org/).

```sh
php composer.phar require skar/mandango:dev-master
```

Then add `Skar\Mandango` to your `config/application.config.php`

Installation without composer is not officially supported, and requires you to install
and autoload the dependencies specified in the `composer.json`.

## Usage

Copy config from `vendor/skar/mandango/config/skar-mandango.local.php.dist`
to `config/autoload/skar-mandango.local.php`.

Add to your config `mandango_config_classes` for mapping:
```php
return [
    'mandango_config_classes' => [
        'Model\Article' => [
            'fields'     => [
                'title'       => 'string',
                'description' => 'string',
            ],
        ],
    ],
];
```

Console command for `Mondator`:
```sh
php public/index.php mandango mondator process
```

In code:
```php
$mandango = $serviceManager->get('mandango');
```
