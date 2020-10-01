<?php

namespace App\Http\Requests;

use App\Rules\ImagenUnique;
use App\Model\Servicio;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ServicioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [
                'required', 'string', 'exists:servicios,name',
            ]
        ];
    }
    public function messages()
    {
       return [
           'name.unique' => 'El nombre de servicio ya esta creado',
       ];
    }
}
