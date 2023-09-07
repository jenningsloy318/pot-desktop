import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spacer } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import React from 'react';

import * as buildinServices from '../../../../../../services/tts';
import { PluginConfig } from '../../PluginConfig';

export default function ConfigModal(props) {
    const { isOpen, onOpenChange, name, updateServiceList, pluginList } = props;
    const serviceType = name.startsWith('[plugin]') ? 'plugin' : 'buildin';
    const { t } = useTranslation();
    const ConfigComponent = name.startsWith('[plugin]') ? PluginConfig : buildinServices[name].Config;

    return serviceType === 'plugin' && !(name in pluginList) ? (
        <></>
    ) : (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior='inside'
        >
            <ModalContent className='max-h-[75vh]'>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            {serviceType === 'buildin' && (
                                <>
                                    <img
                                        src={buildinServices[name].info.icon}
                                        className='h-[24px] w-[24px] my-auto'
                                        draggable={false}
                                    />
                                    <Spacer x={2} />
                                    {t(`services.tts.${name}.title`)}
                                </>
                            )}
                            {serviceType === 'plugin' && (
                                <>
                                    <img
                                        src={pluginList[name].icon}
                                        className='h-[24px] w-[24px] my-auto'
                                        draggable={false}
                                    />

                                    <Spacer x={2} />
                                    {`${pluginList[name].display} [${t('common.plugin')}]`}
                                </>
                            )}
                        </ModalHeader>
                        <ModalBody>
                            <ConfigComponent
                                name={name}
                                pluginType='translate'
                                pluginList={pluginList}
                                updateServiceList={updateServiceList}
                                onClose={onClose}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='danger'
                                variant='light'
                                onClick={onClose}
                            >
                                {t('common.cancel')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}