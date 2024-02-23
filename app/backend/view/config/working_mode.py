import json

PATH = "config/working_mode.json"


def get_working_mode_supported(key_name="execution_parameter"):
    """
    :param key_name: key to search per each dictionary
    :return: list of supported 'execution_parameter'
    """
    execution_parameters = []
    json_content = {}
    with open(PATH) as fp:
        json_content = json.load(fp)
        json_content = json_content.get("modes", {})

    for mode_key in json_content.keys():
        execution_parameters.append(json_content[mode_key][key_name])

    return execution_parameters


def get_db_connection_filename(mode="dev", key_name="database_filename"):
    """
    Return json file path containing connection string params for DB
    :param mode: mode we are currently running
    :param key_name: name to search inside dictionary
    :return: json file path (string), if not defined raise exception
    """
    json_content = {}
    with open(PATH) as fp:
        json_content = json.load(fp)
        json_content = json_content.get("modes", {})

    keys = list(json_content.keys())
    if mode not in keys:
        raise Exception(f"Mode '{mode}' not supported")

    return json_content[mode][key_name]

